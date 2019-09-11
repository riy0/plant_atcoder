import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import './pop.css';

import About from './About';

export default class Pop extends Component{
   state = {
        anchorElm : null
    }

    handleClick = event => {
        this.setState({
            anchorElm : event.currentTarget
        })
    }

    handleClose = () => {
        this.setState({
            anchorElm : null
        })
    }

    render(){
        const {anchorElm} = this.state;
        const open = Boolean(anchorElm);
        return(
            <div>
                <Button
                    onClick = {this.handleClick}
                    area-owns = {open ? this.props.id : undefined}
                    area-haspopup = "true"
                >
                    <h3 className = 'popabout'>{this.props.title}</h3>
                </Button>

                <Popover
                    id = {this.props.id}
                    open = {open}
                    anchorEl = {anchorElm}
                    onClose = {this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}

                >
                    <About></About>
                </Popover>
            </div>
        )
    }
}
