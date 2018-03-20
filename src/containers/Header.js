import HeaderBar from '../components/Header'

import { connect } from 'react-redux'
import { fetchCategories, visitCategory } from '../actions/category'
const mapStateToProps = (state) => {
  return {
    categories: state.categories.list
  }
}
let Header = connect(mapStateToProps, null)(HeaderBar)
export default Header
