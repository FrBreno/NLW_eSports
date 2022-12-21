interface ButtonProps{
  title:string
}

function Button(prop:ButtonProps){
  return <button>{prop.title}</button>
}

function App() {
  return (
    <div>
      <Button title="Botão 01"></Button>
      <Button title="Botão 02"></Button>
      <Button title="Botão 03"></Button>
    </div>
  )
}

export default App
