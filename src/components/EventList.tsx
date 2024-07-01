import { useContext } from "react"
import { EventContext } from "../lib/Context"

export const EventList:React.FC = () => {
    const context=useContext(EventContext)
    if(!context){
        throw new Error("Out of Provider ...")
    }
    const {state}=context
    return <>
        <h4>Event List</h4>
        <div className="list">
            {
                state.events.map(event=><div key={event.id}>
                    <img src={event.cover} alt="" />
                <p>{event.title}</p>
                <small>{event.type} by  <strong>{event.composer}</strong></small>
                <p>{event.date} at {event.time}</p>
                </div>)
            }
        </div>
    </>
}