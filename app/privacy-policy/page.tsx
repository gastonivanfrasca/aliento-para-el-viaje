import React from 'react';

type PrivacyPolicyProps = {
    title: string;
    content: React.ReactNode;
};

const PrivacyPolicySection = ({ title, content }: PrivacyPolicyProps) => {
    return (
        <li>
            <strong>{title}</strong>
            <br />
            <ul>{content}</ul>
        </li>
    );
};

const PrivacyPolicy = () => {
    return (
        <div className="flex-grow px-10 py-8 ">
            <h1 className='mb-4 text-lg font-bold'>Política de Privacidad</h1>

            <ol className='flex flex-col gap-4'>
                <PrivacyPolicySection
                    title="Información que recopilamos"
                    content={<li>No recopilamos información personal de los visitantes de nuestro sitio web.</li>}
                />

                <PrivacyPolicySection
                    title="Uso de la información"
                    content={
                        <li>
                            Utilizamos herramientas de analítica que son respetuosas con la privacidad para obtener datos generales
                            sobre el tráfico y la interacción de los usuarios en el sitio con el objetivo de mejorar la experiencia del
                            usuario.
                        </li>
                    }
                />

                <PrivacyPolicySection
                    title="Compartir información"
                    content={
                        <li>
                            No compartimos ninguna información con terceros para fines comerciales, ya que no recopilamos información
                            personal.
                        </li>
                    }
                />

                <PrivacyPolicySection
                    title="Cookies y tecnologías similares"
                    content={
                        <li>
                            No utilizamos cookies propias para rastrear o almacenar información personal. Sin embargo, es posible que
                            algunas funciones integradas de analítica utilicen cookies o tecnologías similares para su funcionamiento.
                            Puedes optar por no aceptar cookies a través de la configuración de tu navegador.
                        </li>
                    }
                />

                <PrivacyPolicySection
                    title="Tus derechos"
                    content={
                        <li>
                            Dado que no almacenamos información personal, no es necesario realizar acciones para acceder, corregir o
                            eliminar datos personales. Sin embargo, si tienes alguna inquietud, puedes ponerte en contacto con nosotros.
                        </li>
                    }
                />

                <PrivacyPolicySection
                    title="Cambios en la política de privacidad"
                    content={
                        <li>
                            Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cualquier cambio
                            importante.
                        </li>
                    }
                />

                <PrivacyPolicySection
                    title="Contacto"
                    content={
                        <li>
                            Si tienes preguntas o inquietudes sobre nuestra política de privacidad, no dudes en ponerte en contacto con
                            nosotros a través de <a className='font-bold underline' href="mailto:alientoparaelviajeaudios@gmail.com">alientoparaelviajeaudios@gmail.com</a>.
                        </li>
                    }
                />
            </ol>
        </div>
    );
};

export default PrivacyPolicy;
