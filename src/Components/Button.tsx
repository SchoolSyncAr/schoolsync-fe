import "./Button.css"

function Button(props) {
  //button style
  const buttonStyle = {
    padding: props.padding || 10,
    margin: props.margin || 10,
    width: props.width || 100,
    height: props.height || 80,
    display: "inline-block",
    fontFamily: "monospace",
    fontSize: props.fontSize || 20,
    textAlign: "center"
  }

  // const {type = 'button'} = props
  return <button style={buttonStyle} className={ 'button ' + props.className } type={props.buttonBehavior} onClick={props.actionOnClick}>{ props.children}</button>
}

export default Button
