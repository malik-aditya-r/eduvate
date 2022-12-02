import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

//https://codesandbox.io/s/23qvt6?file=/demo.tsx:510-1214
function ListComponent(props) {
    return (
        <div>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={props.data.altName} src={props.data.imageSource} />
            </ListItemAvatar>
            <ListItemText
                primary={props.data.courseName}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {props.data.courseInstructor}
                        </Typography>
                           {" - " + props.data.courseDesc}
                    </React.Fragment>
                }
            />
        </ListItem>
    <Divider variant="inset" component="li" />
        </div>

    );
}

export default ListComponent;