import React from 'react';
import {FaInbox, FaRegCalendarAlt, FaRegCalendar} from 'react-icons/fa';

const Sidebar = ({selectedtab, setselectedtab}) => {
    return (
        <div className="sidebar">
            <div className={selectedtab==="INBOX"?"active":""} onClick={()=>setselectedtab("INBOX")}>
                <FaInbox className="icon"/>
                Inbox
            </div>

            <div  className={selectedtab==="TODAY"?"active":""}  onClick={()=>setselectedtab("TODAY")}>
                <FaRegCalendarAlt className="icon"/>
                Today
            </div>

            <div className={selectedtab==="NEXT_7"?"active":""}  onClick={()=>setselectedtab("NEXT_7")}>
                <FaRegCalendar className="icon"/>
                Next 7 days
            </div>
        </div>
    )
}

export default Sidebar
