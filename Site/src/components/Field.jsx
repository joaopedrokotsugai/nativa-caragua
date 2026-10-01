const control =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-brand-ink placeholder:text-neutral-500 focus:border-brand-forest";

// Campo de formulário com rótulo. as="input" | "textarea" | "select".
function Field({ label, id, as = "input", className = "", children, ...props }) {
  const Tag = as;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brand-forest">
        {label}
      </label>
      <Tag id={id} name={id} className={`${control} ${as === "textarea" ? "min-h-32 resize-y" : ""}`} {...props}>
        {children}
      </Tag>
    </div>
  );
}

export default Field;
