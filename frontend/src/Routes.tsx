import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ListUsers from './components/ListUsers';

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element= {<Login/>}/> 
                <Route path='/' element= {<Dashboard/>}>
                    <Route path='listusers' element= {<ListUsers/>}/>
                </Route>
            </Routes>
        </Router>)
}   