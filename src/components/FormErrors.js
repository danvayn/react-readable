import React from 'react';

const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <div key={i} style={{marginBottom: '5px', padding:'10px'}}className="alert alert-danger alert-dismissable">
          <span><strong>Fix {fieldName} </strong>-- {formErrors[fieldName]}</span>
          </div>
        )
      } else {
        return '';
      }
    })}
  </div>

export default FormErrors
