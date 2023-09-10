import { FaSpotify, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa'
import Information from '@/components/pages/AboutAuthor/Infromation'
import PageTitleSetter from '@/components/common/PageTitleSetter';

const AboutAuthor = () => {
    return (
        <div className="flex p-10 flex-col justify-center items-start flex-shrink-0 gap-4 w-11/12 h-full m-auto md:w-1/2 md:mt-8">
            <Information
                title="Aliento para el viaje"
                description="La vida es un viaje, una travesía del corazón. Tiene momentos maravillosos y tramos inesperados.Los audios Aliento para el viaje son un recordatorio de que la esperanza de Dios y su amor incomparable nos acompañan en cada tramo del camino."
                actions={[
                    {
                        component: <FaSpotify size={24} />,
                        link: "https://open.spotify.com/show/7kU3JSCANdixwpzM6LlKzf"
                    },
                    {
                        component: <FaYoutube size={24} />,
                        link: "https://www.youtube.com/@alientoparaelviaje"
                    }
                ]}
            />
            <Information
                title="Muy buenos días soy Fabi..."
                description="¡Hola, soy Fabiana López! conferencista, coach certificada, autora de los audios y el libro Aliento para el viaje, sirvo junto a mi esposo Marcelo como pastores en iglesia Gracya en Luján de Cuyo, tengo la gran bendición de ser mamá de 4 hijos."
                actions={[
                    {
                        component: <FaFacebook size={24} />,
                        link: "https://www.facebook.com/fabiana.i.lopez"
                    },
                    {
                        component: <FaInstagram size={24} />,
                        link: "https://www.instagram.com/fabianalopezok"
                    }
                ]}
            />
            <PageTitleSetter title={"¿Qué es aliento para el viaje?"} />
        </div>)
}

export default AboutAuthor