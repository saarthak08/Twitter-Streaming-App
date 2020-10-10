import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function ChipsArray(props) {
    const classes = useStyles();

    const handleDelete = (chipToDelete) => () => {
        props.deleteChip(chipToDelete);
    };

    return (
        <Paper component='ul' className={classes.root}>
            {props.chipData.map((data) => {
                return (
                    <li key={data.id}>
                        <Chip
                            disabled={props.disabled}
                            style={{
                                backgroundColor: "aliceblue",
                            }}
                            label={data.tag}
                            onDelete={handleDelete(data)}
                            className={classes.chip}
                        />
                    </li>
                );
            })}
        </Paper>
    );
}
