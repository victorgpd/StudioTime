import { useEffect } from "react";

function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | StudioTime`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
