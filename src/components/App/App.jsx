import { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import SearchBar from "../SearchBAr/SearchBar.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../Loader/Loader.jsx";
import ScrollUp from "../ScrollUp/ScrollUp.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import Background from "../Background/Background.jsx";
import { fetchPicture } from "../../image-api.js";
import "./App.css";

function App() {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState("");
  const [scr, setScr] = useState(0);
  const [scrTo, setSrcTo] = useState(700);

  window.onscroll = () => {
    if (window.scrollY > 400) {
      setScr(1);
    } else {
      setScr(0);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const getData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchPicture(page, query);
        setPictures((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [page, query]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    setSrcTo((prev) => prev + 10);
    window.onload();
  };

  window.onload = () => {
    setTimeout(() => {
      window.scrollBy({
        top: scrTo,
        behavior: "smooth",
      });
    }, 500);
  };

  const handleQuery = (values) => {
    setQuery(values);
    setPictures([]);
    setPage(1);
  };

  const openModal = (modalSrc) => {
    setIsOpen(true);
    setModal(modalSrc);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Background />

      <SearchBar searchQuery={handleQuery} query={query} />

      {!!pictures.length && (
        <ImageGallery images={pictures} openModal={openModal} />
      )}

      {!!pictures.length && page < totalPages && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}

      {isLoading && <Loader />}

      {!!scr && <ScrollUp />}

      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        modal={modal}
      ></ImageModal>

      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
