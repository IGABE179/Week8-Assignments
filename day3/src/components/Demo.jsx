// Small layout wrapper: a visible heading and description for each Hook.
export default function Demo({ hook, description, children }) {
  return (
    <section className="demo">
      <h2>
        <code>{hook}</code>
      </h2>
      <p className="description">{description}</p>
      {children}
    </section>
  );
}