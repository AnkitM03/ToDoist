import React, {useState} from 'react';
import Sidebar from './Sidebar';
import Task from './Task';


const Content = () => {
    const [selectedtab, setselectedtab] = useState("INBOX");
    return (
        <section className="content">
            <Sidebar selectedtab={selectedtab} setselectedtab={setselectedtab}/>

            <Task selectedtab={selectedtab}/>
        </section>
    )
}

export default Content
