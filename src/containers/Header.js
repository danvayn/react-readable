import HeaderBar from '../components/Header'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list
  }
}
let Header = connect(mapStateToProps, null, null, { pure: false })(HeaderBar)
export default Header
