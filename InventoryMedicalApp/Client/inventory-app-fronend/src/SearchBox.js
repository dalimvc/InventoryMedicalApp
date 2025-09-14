import { Form, FormControl, Button } from "react-bootstrap";

//serch box is implemented in multiple components to search for articles
const SearchBox = ({ searchTerm, setSearchTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); //to prevent page reload on form submit
  };

  return (
    <Form className="d-flex justify-content-center searchBox" role="search" onSubmit={handleSubmit}>
      
    <FormControl
      type="search"
      placeholder="Sök artikel..."
      className="me-2 w-100 w-lg-50 large-input"
      aria-label="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    </Form>
  );
};

export default SearchBox;
