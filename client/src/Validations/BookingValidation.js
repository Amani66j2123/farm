import * as yup from "yup";

export const bookingSchema = (existingBookings) =>
  yup.object().shape({
    // Rental start date validation
    rentalStartDate: yup
      .date()
      .required("Rental start date is required")
      .nullable()
      .min(new Date(), "Rental start date cannot be in the past"),

    // Rental end date validation
    rentalEndDate: yup
      .date()
      .required("Rental end date is required")
      .nullable()
      .min(yup.ref("rentalStartDate"), "Rental end date must be after the start date")
      .min(new Date(), "Rental end date cannot be in the past")
      .test(
        "no-overlap",
        "This date range overlaps with an existing booking",
        function (value) {
          const { rentalStartDate } = this.parent;
          if (!value || !rentalStartDate) return true;

          const startDate = new Date(rentalStartDate);
          const endDate = new Date(value);

          for (const booking of existingBookings) {
            const existingStart = new Date(booking.rentalStartDate);
            const existingEnd = new Date(booking.rentalEndDate);

            if (
              (startDate >= existingStart && startDate <= existingEnd) ||
              (endDate >= existingStart && endDate <= existingEnd) ||
              (startDate <= existingStart && endDate >= existingEnd)
            ) {
              return false;
            }
          }

          return true;
        }
      ),
  });
