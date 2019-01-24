import React from 'react'
import gql from 'graphql-tag'
import { Query, Subscription, Mutation } from 'react-apollo'
import { LinearProgress, Checkbox, FormControlLabel } from '@material-ui/core'

const GPIO_READ = gql`
  query GPIO_READ($channel: Int!) {
    gpio {
      read(channel: $channel)
    }
  }
`

const GPIO_SUBSCRIPTION = gql`
  subscription GPIO_SUBSCRIPTION($channel: Int!) {
    gpioChange(channel: $channel)
  }
`

const GPIO_WRITE = gql`
  mutation GPIO_WRITE($channel: Int!, $value: Int!) {
    gpioWrite(channel: $channel, value: $value)
  }
`

const GPIOField = ({ label, channel }) => (
  <Mutation mutation={GPIO_WRITE}>
    {(write, writeResult) => (
      <Query query={GPIO_READ} variables={{ channel }}>
        {read => {
          if (read.loading) return <LinearProgress />
          if (read.error) return `Error! ${read.error.message}`

          return (
            <Subscription
              subscription={GPIO_SUBSCRIPTION}
              variables={{ channel }}
            >
              {subscription => {
                const value =
                  subscription.data &&
                  typeof subscription.data.gpioChange !== 'undefined'
                    ? subscription.data.gpioChange
                    : writeResult.called &&
                      writeResult.data &&
                      typeof writeResult.data.gpioWrite !== 'undefined'
                      ? writeResult.data.gpioWrite
                      : read.data && read.data.gpio && read.data.gpio.read
                return (
                  <div>
                    <div>{writeResult.error && writeResult.error.message}</div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={
                            typeof value === 'undefined' || writeResult.loading
                          }
                          checked={!!value}
                          onChange={e => {
                            write({
                              variables: {
                                channel,
                                value: e.target.checked ? 1 : 0
                              }
                            })
                          }}
                        />
                      }
                      label={label}
                    />
                  </div>
                )
              }}
            </Subscription>
          )
        }}
      </Query>
    )}
  </Mutation>
)

const table = [
  'Alimentation 3.3v',
  'Alimentation 5v',
  'BCM 2 (SDA)',
  'Alimentation 5v',
  'BCM 3 (SCL)',
  'Masse',
  'BCM 4 (GPCLK0)',
  'BCM 14 (TXD)',
  'Masse',
  'BCM 15 (RXD)',
  'BCM 17',
  'BCM 18 (PWM0)',
  'BCM 27',
  'Masse',
  'BCM 22',
  'BCM 23',
  'Alimentation 3.3v',
  'BCM 24',
  'BCM 10 (MOSI)',
  'Masse',
  'BCM 9 (MISO)',
  'BCM 25',
  'BCM 11 (SCLK)',
  'BCM 8 (CE0)',
  'Masse',
  'BCM 7 (CE1)',
  'BCM 0 (ID_SD)',
  'BCM 1 (ID_SC)',
  'BCM 5',
  'Masse',
  'BCM 6',
  'BCM 12 (PWM0)',
  'BCM 13 (PWM1)',
  'Masse',
  'BCM 19 (MISO)',
  'BCM 16',
  'BCM 26',
  'BCM 20 (MOSI)',
  'Masse',
  'BCM 21 (SCLK)'
].reduce((prev, label, i) => {
  if (i % 2 === 0) {
    prev.push([])
  }
  prev[prev.length - 1].push([i + 1, `${i + 1}: ${label}`])
  return prev
}, [])

const GPIO = () => (
  <table>
    {table.map(gpios => (
      <tr>
        {gpios.map((gpio, i) => (
          <td>
            <GPIOField key={i} label={gpio[1]} channel={gpio[0]} />
          </td>
        ))}
      </tr>
    ))}
  </table>
)

export default GPIO
