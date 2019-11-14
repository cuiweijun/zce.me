/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  Tabs as UnstyledTabs,
  TabList as UnstyledTabList,
  Tab as UnstyledTab,
  TabPanel as UnstyledTabPanel
} from 'react-tabs'

const Tabs = props => (
  <UnstyledTabs
    {...props}
    sx={{}}
    disabledTabClassName="active"
    selectedTabClassName="active"
    selectedTabPanelClassName="active"
  />
)

const TabList = props => (
  <UnstyledTabList
    {...props}
    sx={{
      display: 'flex',
      margin: 0,
      padding: 0,
      borderBottomWidth: 2,
      listStyle: 'none'
    }}
  />
)

const Tab = props => (
  <UnstyledTab
    {...props}
    sx={{
      marginBottom: t => `-${t.borderWidths[2]}`,
      paddingX: 3,
      paddingY: 2,
      borderBottomWidth: 2,
      borderColor: 'transparent',
      color: 'muted',
      transition: 'border 0.3s',
      cursor: 'pointer',
      '&[aria-selected=true]': {
        borderColor: 'primary',
        color: 'primary'
      }
    }}
  />
)

const TabPanel = props => <UnstyledTabPanel {...props} />

Tab.tabsRole = 'Tab'
Tabs.tabsRole = 'Tabs'
TabPanel.tabsRole = 'TabPanel'
TabList.tabsRole = 'TabList'

export { Tab, TabList, Tabs, TabPanel }
