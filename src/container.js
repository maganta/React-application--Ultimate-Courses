import react, { Fragment, useState, useEffect, useRef } from 'react';
import Header from './header';
import Section from './section';
import './records.scss';
import List from './list';
import Form from './form';
import axios from 'axios';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';


const sortRecords = records =>
    records.sort((a, b) => {
        if (a.recordName < b.recordName) {
            return -1;
        }
        if (a.recordName > b.recordName) {
            return 1;
        }
        return 0;

    });



const Container = ({ setShowApp }) => {

    const [records, setRecords] = useState([]);
    const [liveText, setLivetext] = useState('');
    const isMounted = useRef(true);


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/records', {
                headers:{
                    'cache-control': 'private',
                    'X-custom-Header': 'some-value'
                },
            });
            if (isMounted.current) {
                setRecords(sortRecords(data));
            }

        }


        fetchData();

        return () => {
            isMounted.current = false;
        }

    }, [])

    const onSubmitHandler = async entry => {
        // setRecords(sortRecords([...records, entry]))
        const {data} = await axios.post('/api/records', entry)
        if (isMounted.current) {
            setRecords(sortRecords([...records, data]));
            setLivetext(`${entry.recordName} successfully added.`)
        }
    };


    return (
        <Router>
            <Header />
            <main>
                <Section headingText="Add a new favorite" >
                <Switch>
                <Route path="/">
                    <Form onSubmit={onSubmitHandler} />
                </Route>
                </Switch>
                </Section>
                <Section headingText="Records">
                <Switch>
                <Route path="/">
                    <List records={records} />
                </Route>
                </Switch>
                </Section>

            </main>
            <div className="visually-hidden" aria-live="polite" aria-atomic="true">{liveText}</div>
        </Router>

    );
}

export default Container;
