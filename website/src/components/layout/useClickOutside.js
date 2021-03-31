import { useEffect } from "react"

export default function useClickOutSide(sidebarRef, setActive) {
  useEffect(() => {
    let scrollToTop = document.querySelector(".scroll-to-top")
    let main = document.querySelector(".main")

    document.addEventListener("click", handleClickOutside)
    scrollToTop.addEventListener("click", toTop)
    main.addEventListener("scroll", activeScrollTop)

    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.classList.contains("open-sidebar")) {
        setActive(false)
      }
    }

    function activeScrollTop() {
      scrollToTop.style.display = main.scrollTop > 50 ? "block" : "none"
    }

    function toTop() {
      main.scrollTop = 0
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, false)
      scrollToTop.removeEventListener("click", toTop)
      window.removeEventListener("scroll", activeScrollTop)
    }
  }, [setActive, sidebarRef])
}