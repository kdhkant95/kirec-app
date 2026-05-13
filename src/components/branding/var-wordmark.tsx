export function VarWordmark({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: 130, height: 60, position: "relative" }}>
      {/* bracket */}
      <svg
        viewBox="0 0 45.5 33"
        fill="none"
        style={{ position: "absolute", left: 9, top: 13.5, width: 45.5, height: 33 }}
      >
        <path
          d="M17.3281 3.13135L17.2129 8.65918L7.40527 7.20996L8.38574 27.5L24.3662 24.1743L24.1201 29.915L3.33496 33L0 0.75L17.3281 3.13135ZM41.4502 31.5L30.1245 29.9409L30.3599 24.4487L36.2417 25.6021L38.9053 6L23.2148 8.63574L23.3311 3.04395L45.5 0L41.4502 31.5Z"
          fill="white"
        />
      </svg>

      {/* VAR text */}
      <div
        style={{
          position: "absolute",
          left: 57.5,
          top: 19,
          width: 54.353,
          height: 20.52,
          transform: "skewX(-10.42deg)",
        }}
      >
        <svg viewBox="0 0 54.3531 20.52" fill="none" style={{ width: "100%", height: "100%" }}>
          <path d="M45.2271 13.392H41.5551V20.52H37.9911V0H45.2271C49.8981 0 52.7061 2.889 52.7061 6.696C52.7061 9.234 51.4911 11.286 49.4121 12.42L54.3531 20.52H50.2221L46.0641 13.365C45.7941 13.392 45.4971 13.392 45.2271 13.392ZM41.5551 10.368H45.2271C47.6571 10.368 49.1421 8.802 49.1421 6.696C49.1421 4.563 47.6571 3.024 45.2271 3.024H41.5551V10.368Z" fill="white" />
          <path d="M32.4546 20.52L30.3486 15.363H22.2486L20.1426 20.52H16.4706L25.0836 0H27.5136L36.1266 20.52H32.4546ZM26.2986 5.481L23.4906 12.339H29.1066L26.2986 5.481Z" fill="white" />
          <path d="M0 0H3.726L8.748 13.797L9.288 15.471L9.828 13.797L14.85 0H18.576L10.584 20.52H7.992L0 0Z" fill="white" />
        </svg>
      </div>

      {/* red dot */}
      <svg
        viewBox="0 0 6 6"
        fill="none"
        style={{ position: "absolute", left: 114.5, top: 17, width: 6, height: 6 }}
      >
        <circle cx="3" cy="3" r="3" fill="#FF3232" />
      </svg>
    </div>
  )
}
