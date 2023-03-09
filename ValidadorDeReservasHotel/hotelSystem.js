function hotelSystem(rooms) {
  const reservations = [];
  const available = [];

  const isRoomAvailable = (roomNumber, checkIn, checkOut) => {
    for (let reserva of reservations) {
      if (
        reserva.roomNumber === roomNumber &&
        ((new Date(checkIn) >= new Date(reserva.checkIn) &&
          new Date(checkIn) < new Date(reserva.checkOut)) ||
          (new Date(checkOut) > new Date(reserva.checkIn) &&
            new Date(checkOut) <= new Date(reserva.checkOut)) ||
          (new Date(checkIn) <= new Date(reserva.checkIn) &&
            new Date(checkOut) >= new Date(reserva.checkOut)))
      ) {
        return false;
      }
    }
    return true;
  };

  return {
    searchReservation: (id) => {
      if (reservations.some((reservation) => reservation.id == id)) {
        let result = reservations.find((item) => item.id == id);
        return result;
      } else {
        throw new Error("La reservación no fue encontrada");
      }
    },

    getSortReservations: () =>
      reservations.sort(
        (a, b) =>
          new Date(`${new Date().getFullYear()}/${a.checkIn}`) -
          new Date(`${new Date().getFullYear()}/${b.checkIn}`)
      ),

    addReservation: (reserv) => {
      if (reserv.roomNumber == undefined || reserv.roomNumber == "") {
        throw new Error(
          "Por favor establece el número de la habitación solicitada"
        );
      } else {
        if (
          reservations.some((a) => reserv.roomNumber == a.roomNumber) &&
          isRoomAvailable(reserv.roomNumber, reserv.checkIn, reserv.checkOut) ==
            false
        ) {
          throw new Error(
            "La habitación solicitada ya se encuentra asignada para la fecha indicada"
          );
        } else {
          if (reserv.roomNumber < 1 || reserv.roomNumber > rooms) {
            throw new Error("La habitación solicitada no existe");
          } else {
            reservations.push(reserv);
            return "Se agregó un nuevo usuario";
          }
        }
      }
    },

    removeReservation: (id) => {
      let borrado = reservations.find((a) => a.id === id);
      if (borrado) {
        return reservations.splice(reservations.indexOf(borrado), 1)[0];
      } else {
        throw new Error("La reserva indica no existe");
      }
    },

    getReservations: () => reservations,

    getAvailableRooms: (checkIn, checkOut) => {
      const availableRooms = [];
      for (let i = 1; i <= rooms; i++) {
        if (isRoomAvailable(i, checkIn, checkOut)) {
          availableRooms.push(i);
        }
      }
      if (availableRooms.length === 0) throw new Error("No hay habitaciones disponibles");
      return availableRooms;
    },
  };

  return reservations;
}

const hotel = hotelSystem(3);

hotel.addReservation({
  id: 2,
  name: "John Doe",
  checkIn: "01/09",
  checkOut: "01/12",
  roomNumber: 1,
});

// console.log(hotel.getAvailableRooms("01/08","01/11"));

hotel.addReservation({
  id: 3,
  name: "frank Doe",
  checkIn: "01/09",
  checkOut: "01/12",
  roomNumber: 2,
});

console.log(hotel.removeReservation(3));
