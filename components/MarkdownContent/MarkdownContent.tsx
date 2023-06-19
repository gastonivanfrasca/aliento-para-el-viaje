"use client"
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useContextReducerState } from "@/hooks/useContextReducer";

type Props = {
  markdowns: {
    completion: string;
    translation: string;
  };
};


const MarkdownContent = (props: Props) => {
  const { markdowns } = props;
  const { completion, translation } = markdowns;
  const [markdown, setMarkdown] = useState<string>("");
  const { lang } = useContextReducerState();

  useEffect(() => {
    if (lang === "es") {
      setMarkdown(completion);
    } else {
      setMarkdown(translation);
    }
  }, [lang]);

  if (!markdown) {
    return null;
  }

  return (
    <ReactMarkdown
      // react/no-children-prop is disabled because we need to pass children
      // eslint-disable-next-line react/no-children-prop
      children={markdown}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="py-2 text-4xl font-bold" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="py-2 text-3xl font-bold" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="py-2 text-2xl font-bold" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="py-2 text-xl font-bold" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="py-2 text-lg font-bold" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="py-2 text-base font-bold" {...props} />
        ),
        p: ({ node, ...props }) => (
          <div className="max-w-prose py-2">
            <p className="text-lg" {...props} />
          </div>
        ),
        ul: ({ node, ...props }) => (
          <ul className="py-2 list-disc ml-8" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="py-2 list-decimal ml-8" {...props} />
        ),
        li: ({ node, ...props }) => <li className="py-2 my-2" {...props} />,
        a: ({ node, ...props }) => (
          <a className="py-2 text-blue-500" {...props} />
        ),
      }}
    />
  );
};

export default MarkdownContent;


const text = "# Buenos días\n\nSoy Fabi. Estamos terminando otra semana de audios aliento para el viaje. Dios está tan cerca como el aire que respiramos. Algunos estudiosos del hebreo han expresado que el nombre de Dios yavé es sinónimo del sonido de la respiración para el pueblo de Israel, era demasiado sagrado para pronunciarlo. Por otra parte, está presente cada vez que inhalamos o exhalamos lo invoques o no, Dios está aquí. Era la frase del filósofo. Erasmo como un recordatorio de la omnipresencia de Dios.\n\n## Dios en nuestro corazón\n\nSin embargo, tal vez lo más asombroso sea que Dios se encuentra a la puerta de nuestro corazón. Aquí estoy a la puerta y llamo. Si oyes mi voz y abres la puerta. Cenaremos juntos como amigos. Dice Apocalipsis capítulo y esta mañana, mi imaginación voló y pensé Cómo sería del otro lado de la puerta dentro de cada uno de nosotros? Qué pasa realmente del otro lado? Cuáles son las prioridades de este día frente a aquel que llama a tu puerta y a la mía?\n\n## Reflexiones y prioridades\n\nEspera. Necesito solucionar problemas. O no puedo atenderte hoy. Cómo te invitaría a entrar con todo este desorden en el que vivo? Hoy no puedo. Tengo que ocuparme de mis hijos. Perdón, pero tengo que ser productiva hoy no puedo abrir. Me siento demasiado triste. Y sólo hay una manera de experimentar la verdadera paz y es abriendo la puerta al único que realmente es la respuesta a nuestras preocupaciones desorden tristezas el Dios, nuestro Señor.\n\n## Conectar con Dios\n\nÉl mismo creó nuestros corazones para que compartamos esos momentos de intimidad con el que le devuelven la vida, la esperanza a nuestra alma y espíritu. Estamos más solos que nunca en nuestro afán por lograr. Nos hemos vuelto productos. En lugar de sabernos amados y apreciados por lo que somos, la llevaré al desierto y allí le hablaré a su corazón. Dice la voz de Dios en Oseas, capítulo dos.\n\n## Ideas para abrir la puerta a Dios\n\nCómo abro la puerta de mi corazón a Dios de una manera práctica este fin de semana? Algunas ideas? Qué tal un paseo tranquilo? O una taza de café o un mate? Con algunas de esas promesas de Dios que nos anclan en medio de las tormentas de la vida? O una oración de confesión por haber corrido demasiado lejos del corazón de Dios y sentirnos agotados.\n\n## Descansar en la paz de Dios\n\nEl Señor Jesús es real en tu vida real. Deja que te ame. Confía en sus brazos. Descansemos este fin de semana en su paz. El salmo dice Sé que el Señor siempre está conmigo no seré sacudido porque Él está aquí a mi lado. Que así sea. En el nombre del Señor Jesucristo, amén. Bendecido fin de semana para todos.";