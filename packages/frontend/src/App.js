import React from 'react'

import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { ApolloProvider } from './lib/Apollo'

import AppBar from './components/ui/AppBar'

import GPIO from './components/GPIO'

const Content = p => (
  <div style={{ padding: 10, maxWidth: 800, margin: '0 auto' }} {...p} />
)

export default function App () {
  return (
    <ApolloProvider>
      <AppBar />
      <Content>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='headline' component='h3'>
              GPIO
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component='div'>
              <GPIO />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Content>
    </ApolloProvider>
  )
}
