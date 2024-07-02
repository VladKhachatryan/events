import { Box, Button, Modal, TextField,MenuItem,Select } from "@mui/material"
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addEvent } from "../lib/api";
import { ActionTypes, IEvent, events } from "../lib/types";
import { EventContext } from "../lib/Context";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color:"black",
    p: 4,
  };

  interface Inputs{
    title:string,
    date:string,
    time:string,
    cover:string,
    type:string,
    composer:string
  }
export const AddEvent = () => {
    const [open,setOpen]=useState<boolean>(false)
    const context = useContext(EventContext)
    if(!context){
        throw new Error("Error")
    }
    const {dispatch} = context
    const {register,handleSubmit,formState: { errors },reset }=useForm<Inputs>({
        defaultValues:{
            type:"opera"
        }
    })
    const handleAdd:SubmitHandler<Inputs> = (data) => {
        const event:Omit<IEvent,"id">={
            title: data.title,
            date: data.date,
            time: data.time,
            cover: data.cover,
            type:data.type as unknown as events,
            composer: data.composer
        }
        addEvent(event as IEvent)
        .then(res=>{
            dispatch({type:ActionTypes.addEvent,payload:res})
            reset()
            setOpen(false)         
        })
    }
    return <Box my={2}>
        <Button onClick={() => setOpen(true)} variant="contained">add</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(handleAdd)}>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="Title"
                            {...register("title",{required:"Title is required"})}
                            error={!!errors.title}
                            helperText={errors.title?.message}                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="Date"
                            {...register("date",{required:"Date is required"})}
                            error={!!errors.date}
                            helperText={errors.date?.message}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="Time"
                            {...register("time",{required:"Time is required"})}
                            error={!!errors.time}
                            helperText={errors.time?.message}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="Composer"
                            {...register("composer",{required:"Composer is required"})}
                            error={!!errors.composer}
                            helperText={errors.composer?.message}
                        />
                    </Box>
                    <Box my={2}>
                       <Select sx={{width:200}} {...register("type",{required:"Type is required"})}
                            error={!!errors.date}
                       >
                           <MenuItem value="opera">opera</MenuItem>
                           <MenuItem value="ballet">ballet</MenuItem>
                       </Select>
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="Cover"
                            {...register("cover",{required:"Cover is required"})}
                            error={!!errors.cover}
                            helperText={errors.cover?.message}
                        />
                    </Box>
                    <Button type="submit" variant="outlined"  > submit</Button>
                </form>
            </Box>
        </Modal>
    </Box>
}