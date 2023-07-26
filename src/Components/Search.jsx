import { useEffect, useState, useMemo, useRef } from "react";
import createSlug from "../lib/createSlug";
import Fuse from "fuse.js";

export default function ({ posts }) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const inputRef = useRef();
  // Now the Fuse object will get created only when the posts is changed, which is going to happen very less.
  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["data.title", "data.description"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [posts]
  );

  useEffect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setSearchValue(searchStr);
  }, []);

  useEffect(() => {
    // Add search result only if
    // input value is more than one character
    let inputResult =
      searchValue.length > 1
        ? fuse.search(searchValue).map((item) => item.item)
        : [];
    setFilteredPosts(inputResult);

    // Update search string in URL
    if (searchValue.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", searchValue);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(null, "", newRelativePathQuery);
    } else {
      history.replaceState(null, "", window.location.pathname);
    }
  }, [searchValue]);

  return (
    <section>
      <form>
        <input
          type="text"
          className="w-full p-2 bg-black/50 text-white outline outline-teal-200 outline-[1px]"
          placeholder="Search Post..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          ref={inputRef}
        />
      </form>
      <section className="mt-8">
        {!(searchValue.length > 1) ? null : (
          <p>
            {filteredPosts.length} Search Result(s) for "{searchValue}"
          </p>
        )}
        <section className="my-4">
          {filteredPosts?.map((post, index) => (
            <article key={index} className="px-2">
              <a
                href={`/posts/${createSlug(post?.data?.title)}`}
                className="space-y-2"
              >
                <h3 className="text-xl font-bold text-teal-200 hover:underline underline-offset-8 decoration-dashed decoration-teal-200 max-w-fit">
                  {post?.data?.title}
                </h3>
                <div className="text-sm space-x-2 italic">
                  <span>{post?.data?.publishDate}</span>
                  <span>{post?.data?.author}</span>
                </div>
                <div className="space-x-2 text-teal-200">
                  {post?.data?.tags.map((tag, index) => (
                    <span key={index}>#{tag}</span>
                  ))}
                </div>
                <p className="sm:text-lg">{post?.data?.description}</p>
              </a>
            </article>
          ))}
        </section>
      </section>
    </section>
  );
}
