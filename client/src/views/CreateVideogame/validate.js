export default function validate(newVideogame) {
  const errors = {};

  if (!newVideogame.name) {
    errors.name = "Name is required";
  } else if (newVideogame.name.length >= 15) {
    errors.name = "Name is too long";
  }

  if (!newVideogame.description) {
    errors.description = "Description is required";
  } else if (newVideogame.description.length >= 100) {
    errors.description = "Description is too long";
  }

  if (!newVideogame.releaseDate) {
    errors.releaseDate = "Release Date is required";
  }

  if (!newVideogame.rating) {
    errors.rating = "Rating is required";
  }

  return errors;
}
