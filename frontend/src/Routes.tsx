import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Login from './pages/Login';
import Response from './pages/Response';

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element= {<Login/>}/>
                <Route path='/response/:slug' element= {<Response/>}/>
                <Route path='*' element= {<Login/>}/>
            </Routes>
        </Router>)
}   