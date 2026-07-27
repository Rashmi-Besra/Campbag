const StatusBadge = ({ quantity }) => {

  let status = "";
  let styles = "";

  if (quantity > 0) {
    status = "In Stock";
    styles = "bg-green-100 text-green-700";
  } else {
    status = "Out of Stock";
    styles = "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;