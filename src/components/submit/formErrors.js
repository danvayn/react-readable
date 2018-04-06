import React from 'react';

const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((name, i) => {
      if(formErrors[name].length > 0){
        return (
          //TODO: move style to class
          <div key={i} className="alert-error alert alert-danger alert-dismissable">
          <span><strong>Fix {name} </strong>-- {formErrors[name]}</span>
          </div>
        )
      } else {
        return '';
      }
    })}
  </div>

export default FormErrors
