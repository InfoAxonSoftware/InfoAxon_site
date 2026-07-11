export default function CompanyLogo({
  className = 'h-11 w-auto',
  loading = 'eager',
}) {
  return (
    <img
      src="/images/main/infoaxon-logo.png"
      alt="InfoAxon Software Solutions"
      className={`object-contain ${className}`}
      loading={loading}
    />
  );
}
