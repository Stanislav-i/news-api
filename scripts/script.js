import NewsService from "./NewsService.js";
import LoadMoreBtn from "./components/LoadMoreBtn.js";

const refs = {
  form: document.getElementById("form"),
  newsWrapper: document.getElementById("newsWrapper"),
};

const newsService = new NewsService();
const loadMoreBtn = new LoadMoreBtn({
    selector: "#loadMore",
    isHidden: true
});

refs.form.addEventListener("submit", onSubmit);
loadMoreBtn.button.addEventListener("click", fetchArticles);

function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const value = form.elements.news.value.trim();

  if (value === "") alert("No value!");
  else {
    newsService.searchQuery = value;
    newsService.resetPage();
    
    loadMoreBtn.show();
    clearNewsList();

    fetchArticles().finally(() => form.reset());
  }
}

function fetchArticles() {
    loadMoreBtn.disable();
  return getArticlesMarkUp().then(() => loadMoreBtn.enable());
}

function createMarkup({ title, author, description, url, urlToImage }) {
  return `
  <div class="article-card">
    <h2 class="article-title">${title}</h2>
    <h3 class="article-author">${author || "Unknown"}</h3>
    <img src=${
      urlToImage ||
      "https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    } class="article-img" alt=${title}>
    <p class="article-description">${description}</p>
    <a href=${url} target="_blank" class="article-link">Read more</a>
  </div>`;
}

function getArticlesMarkUp() {
    
    return newsService
    .getNews()
    .then((articles) => {
      if (articles.length === 0) throw new Error("No data");

      return articles.reduce(
        (markup, article) => markup + createMarkup(article),
        ""
      );
    })
    .then(updateNewsList)
    .catch(onError);
}

function updateNewsList(markup) {
  refs.newsWrapper.insertAdjacentHTML("beforeend", markup);
}

function onError(err) {
    loadMoreBtn.hide();
  console.error(err);
  refs.newsWrapper.innerHTML = "<p>Not found!</p>";
}

function clearNewsList() {
  refs.newsWrapper.innerHTML = "";
}
