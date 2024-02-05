function FormGrid({ children, text }) {
  return (
    <article className="w-full">
      <div className="m-auto mt-12 w-[70rem] h-auto bg-slate-50 pb-2">
        <h1 className="font-semibold text-xl uppercase m-4 p-4 border-b">
          {text}
        </h1>
        {children}
      </div>
    </article>
  );
}

export default FormGrid;
