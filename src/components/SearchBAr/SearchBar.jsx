import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

const notify = () => toast.error("This field must be filled.");

const SearchBar = ({ searchQuery, query }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    searchQuery(values.query);
  };

  return (
    <header className={css.header}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.field}
            name="query"
            placeholder="Search images and photos"
          />
          <button type="submit" onClick={notify}>
            <FaSearch />
          </button>
          {!query && <Toaster />}
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
