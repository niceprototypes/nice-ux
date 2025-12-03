import Button from "nice-react-button"

export const prepareOnClick = () => [
  {
    name: "onClick",
    description: "Click handler function",
    demo: (
      <Button onClick={() => alert("Button clicked!")}>
        Click Me
      </Button>
    ),
    code: `<Button onClick={() => console.log("clicked")}>\n+1Click Me\n</Button>`,
  },
]