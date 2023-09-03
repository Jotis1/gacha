"use client";

export default function Home() {
  let data: any = null;
  let tiradasRealizadas: number = 0;

  function obtenerNumeroAleatorio() {
    const min = 1;
    const max = 313506;
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroAleatorio;
  }

  async function getRandomCharacter() {
    try {
      /*if (tiradasRealizadas >= 10) {
        alert("Ya has realizado 10 tiradas.");
        return;
      }*/

      const number = obtenerNumeroAleatorio();
      const url = `https://y-anime.europe-west1.firebasedatabase.app/${number}.json`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      data = await res.json();

      // Aplicar temporalmente la clase de animación
      const cardSection = document.querySelector('.card-section') as HTMLElement;
      cardSection.classList.add('card-enter');

      // Actualiza la vista con los datos recibidos y el contador de tiradas
      actualizarVista();

      // Eliminar la clase de animación después de un breve retraso (puedes ajustar el tiempo)
      setTimeout(() => {
        cardSection.classList.remove('card-enter');
      }, 500); // 500 ms, ajusta según la duración de tu animación
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  // Función para manejar el clic en el botón del corazón
  function handleHeartClick() {
    if (data && data.id) {
      // Guardar la ID del personaje en el localStorage
      const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      favoritos.push(data.id);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      alert('Personaje añadido a favoritos.');
    } else {
      alert('No se pudo añadir a favoritos, datos del personaje no disponibles.');
    }
  }

  // Función para actualizar la vista con los datos obtenidos
  function actualizarVista() {
    if (data == null) {
      return getRandomCharacter();
    }

    tiradasRealizadas++;
    const largeImage = document.querySelector('.large-image') as HTMLElement;
    const userPreferredName = document.querySelector('.user-preferred-name');
    const tiradasRealizadasP = document.querySelector('.tiradas');
    const gender = document.querySelector('.gender') as HTMLElement;
    const favourites = document.querySelector('.favourites');

    if (largeImage) {
      largeImage.style.backgroundImage = `url(${data.image.large})`;
    }
    console.log(data)
    if (gender) {
      if (data.gender == "Male") {
        gender.classList.add("bg-blue-400")
        gender.classList.remove("bg-pink-400")
        gender.classList.remove("bg-neutral-400")
      } else if (data.gender == "Female") {
        gender.classList.add("bg-pink-400")
        gender.classList.remove("bg-blue-400")
        gender.classList.remove("bg-neutral-400")
      } else {
        gender.classList.add("bg-neutral-400")
        gender.classList.remove("bg-pink-400")
        gender.classList.remove("bg-blue-400")
      }
    }
    if (userPreferredName) {
      userPreferredName.textContent = data.name.userPreferred;
    }

    if (favourites) {
      favourites.textContent = `${data.favourites} favoritos`;
    }
    if (tiradasRealizadasP) {
      tiradasRealizadasP.textContent = `${tiradasRealizadas}/10 cartas`
    }

  }

  return (
    <main className='w-full'>
      <div className='flex flex-col w-full h-[100vh] items-center justify-center'>
        <button className="m-10 bg-slate-100 p-2" onClick={getRandomCharacter}>
          Obtener Personaje Aleatorio
        </button>
        <p className='mb-10 p-2 bg-slate-100 rounded-md shadow-md tiradas'>{tiradasRealizadas}/10 cartas</p>
        <section className='flex flex-col w-[300px] h-[500px] bg-slate-100 rounded-xl shadow-md p-5 relative card-section'>
          <div className='w-full aspect-square bg-slate-50 rounded-xl bg-image bg-center bg-cover large-image'></div>
          <div className='w-full mt-5 flex-col flex-grow flex text-slate-950 justify-around items-center'>
            <div className='w-full'>
              <p className='font-black text-2xl truncate text-center user-preferred-name'></p>
              <p className='p-2 w-fit mx-auto text-center bg-pink-500 mt-3 text-xs text-white rounded-xl shadow-md favourites'></p>
            </div>
            <div className='w-full flex justify-between px-5'>
              <button className='p-2 border-2 border-green-500 rounded-full w-14 h-14 flex items-center justify-center text-green-500 hover:text-slate-50  hover:bg-green-500 transition-all' onClick={handleHeartClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10  top-0.5 relative">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </button>
              <button className='p-2 border-2 border-red-500 rounded-full w-14 h-14 flex items-center justify-center text-red-500 hover:text-slate-50  hover:bg-red-500 transition-all'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 relative">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <span className='absolute w-4 h-4 rounded-full -top-[5px] -right-[5px] gender'></span>
        </section>
      </div>
    </main>
  )
}
