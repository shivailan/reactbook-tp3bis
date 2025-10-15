import useFormInput from "../hooks/useFormInput";

const CreatePostForm = ({ dispatch }) => {
  const textInput = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textInput.value.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "Nouvel Auteur",
      content: textInput.value,
      liked: false,
    };

    dispatch({ type: "ADD_POST", payload: newPost });
    textInput.onChange({ target: { value: "" } }); // reset du champ
  };

  console.log("render <CreatePostForm>");

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...textInput} placeholder="Nouveau post..." />
      <button type="submit">Publier</button>
    </form>
  );
};

export default CreatePostForm;
