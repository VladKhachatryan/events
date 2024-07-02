import { useContext, useState } from "react";
import { EventContext } from "../lib/Context";
import { IEvent } from "../lib/types";
import { CopyModal } from "./CopyModal";
export const EventList: React.FC = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("Out of provider...");
    }
    const { state } = context;
    const [selEvent, setSelEvent] = useState<IEvent | null>(null);
    return <>
        <h1>Event List</h1>
        <div className="list">
            {
                state.events.map(e => <div key={e.id}>
                    <img src={e.cover} />
                    <p>{e.title}</p>
                    <small>{e.type} by <strong>{e.composer}</strong></small>
                    <p>{e.date} at {e.time}</p>
                    <button onClick={() => setSelEvent(e)}>Copy</button>
                </div>)
            }
        </div>
        {selEvent && <CopyModal event={selEvent} onClose={() => setSelEvent(null)} />}
    </>
}