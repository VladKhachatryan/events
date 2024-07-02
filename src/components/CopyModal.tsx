import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActionTypes } from "../lib/types";
import { EventContext } from "../lib/Context";
import {CopyModalProps} from "../lib/types"
import { IEvent,events } from "../lib/types";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface Inputs {
    title: string
    date: string
    time: string
    cover: string
    type: string
    composer: string
}
export const CopyModal: React.FC<CopyModalProps> = ({ event, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        defaultValues: event
    });
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("Out of provider...");
    }
    const { dispatch } = context;
    const handleCopy: SubmitHandler<Inputs> = (data) => {
        const event:Omit<IEvent,"id">={
            title: data.title,
            date: data.date,
            time: data.time,
            cover: data.cover,
            type:data.type as unknown as events,
            composer: data.composer
        }       

        axios
            .post("http://localhost:3004/events", event)
            .then(res => {
                dispatch({ type: ActionTypes.addEvent, payload: res.data });
                onClose();
                reset();
            });
    }

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(handleCopy)}>
                    <Box my={2}>
                        {errors.title && <p style={{ color: "red" }}>Please fill the title</p>}
                        <TextField
                            variant="outlined"
                            label="title"
                            {...register("title", { required: true })}
                        />
                    </Box>
                    <Box my={2}>
                        {errors.date && <p style={{ color: "red" }}>Please fill the date</p>}
                        <TextField
                            variant="outlined"
                            label="date"
                            {...register("date", { required: true })}
                        />
                    </Box>
                    <Box my={2}>
                        {errors.time && <p style={{ color: "red" }}>Please fill the time</p>}
                        <TextField
                            variant="outlined"
                            label="time"
                            {...register("time", { required: true })}
                        />
                    </Box>
                    <Box my={2}>
                        {errors.composer && <p style={{ color: "red" }}>Please fill the composer</p>}
                        <TextField
                            variant="outlined"
                            label="composer"
                            {...register("composer", { required: true })}
                        />
                    </Box>
                    <Box my={2}>
                        {errors.type && <p style={{ color: "red" }}>Please choose opera or ballet</p>}
                        <Select sx={{ width: 200 }} {...register("type", { required: true })}>
                            <MenuItem value="opera">opera</MenuItem>
                            <MenuItem value="ballet">ballet</MenuItem>
                        </Select>
                    </Box>
                    <Box my={2}>
                        {errors.cover && <p style={{ color: "red" }}>Please fill the cover</p>}
                        <TextField
                            variant="outlined"
                            {...register("cover", { required: true })}
                            label="cover"
                        />
                    </Box>
                    <Button type="submit" variant="outlined">Save</Button>
                </form>
            </Box>
        </Modal>
    );
}