import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
})

const Block = props => <Paper className={props.classes.root} {...props} />

Block.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Block)
