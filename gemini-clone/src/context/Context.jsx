import { createContext, useState } from "react";
import runChat from '../config/gemini'


/*Esto exporta un objeto llamado Context, que se crea utilizando la función createContext() de React. Este objeto Context es esencialmente una "caja" donde podemos poner datos que queremos compartir entre diferentes partes de nuestra aplicación. */
export const Context = createContext();

const ContextProvider = (props) => { /*Esto define un componente de función llamado ContextProvider. Este componente es responsable de proporcionar el contexto a otros componentes de la aplicación. */

/*Este componente es el proveedor de contexto. Define varios estados y funciones para manejar la lógica de la aplicación. */
    const [input, setInput] = useState("");
    const [resentPrompt, setResentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => { /*index representa la posición del carácter en la cadena, y nextWord es el carácter en esa posición. */
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }

    const newChat = () => { /*Esta es una función llamada newChat que se utiliza para restablecer algunos estados cuando se inicia un nuevo chat. Establece el estado loading en false y el estado showResult en false. */
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
     /*asegura que la interfaz mostrará el resultado del chat después de que se complete la solicitud*/

        setResultData("")  /* borra cualquier respuesta anterior */
        setLoading(true) /*activa un indicador de carga para mostrar al usuario que el chat está procesando su solicitud*/
        setShowResult(true) /*asegura que la interfaz mostrará el resultado del chat después de que se complete la solicitud*/

        let response;
        if (prompt !== undefined) { /* prompt: que representa la entrada del usuario en el chat.  Si prompt NO es undefined, significa que el usuario ha proporcionado una entrada específica para el chat.*/ 
            response = await runChat(prompt); /*se llama a la función runChat(prompt) para enviar el prompt al sistema de chat y obtener una respuesta. La respuesta se asigna a la variable response.*/ 
            setResentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input]) /*Si prompt es undefined, significa que el usuario ha enviado un mensaje de texto sin indicación específica.
             En este caso, se utiliza el estado input actual del usuario como entrada para el sistema de chat. La respuesta también se asigna a la variable response */
            setResentPrompt(input)
            response = await runChat(input)
        }
        
        let responseArray = response.split('**'); /*la respuesta se divide en partes utilizando split('**'). Esto significa que la respuesta del chat puede contener partes separadas por el texto '**'*/
        let newResponse = " " ; /*la función recorre estas partes en un bucle for para procesarlas una por una */
        for(let i =0 ; i < responseArray.length; i++){ /*Durante este bucle, se comprueba si el índice del elemento actual (i) (osea los '**') es par o impar. Si es par, significa que es una parte normal del texto. Si es impar, significa que es una parte que debe mostrarse en negrita. */ 
        /*i === 0: Esta parte verifica si el índice i es igual a 0. Si es así, significa que estamos en la primera posición del array responseArray */
            if ( i === 0 || i%2 !== 1) { /*i % 2 !== 1: Esta parte verifica si el índice i es impar. El operador % calcula el residuo de la división entre i y 2. Si el residuo es diferente de 1, significa que i es impar. Entonces, esta condición se cumple para todos los índices impares en el array responseArray. */
                newResponse += responseArray[i];
            }
            else{
                newResponse += '<b>' +responseArray[i]+ '</b>'; /*Para construir la respuesta procesada, se concatena cada parte del texto con o sin etiquetas <b> (negrita) según corresponda. */
            }
        }
        let newResponse2 = newResponse.split('*').join('<br/>') /*A continuación, se utiliza split('*').join('<br/>') para dividir la respuesta utilizando asteriscos (*) y luego unir las partes con etiquetas <br/> */
        let newResponseArray = newResponse2.split(""); /*Esto se hace utilizando split(""), donde una cadena vacía "" se pasa como argumento, lo que significa que cada carácter se convierte en un elemento separado en el array. */
        for(let i=0; i<newResponseArray.length;i++) /*Este bucle for itera sobre cada elemento del array newResponseArray, que contiene caracteres individuales de la cadena newResponse2.*/ 
        {
            const nextWord = newResponseArray[i]; /* Se obtiene el siguiente carácter en la cadena, que está en la posición i del array newResponseArray */
            delayPara(i,nextWord+'') /* Llama a la función delayPara con dos argumentos: el índice i y el siguiente carácter de la cadena. Esto se hace para mostrar la respuesta del chat letra por letra con un pequeño retraso entre cada letra. */
        }
        setLoading(false) /* Establece el estado loading en false. Esto indica que se ha completado el procesamiento y la carga de la respuesta del chat, y el indicador de carga puede desaparecer de la interfaz. */
        setInput("") /* Establece el estado input en una cadena vacía. Esto limpia el cuadro de entrada, preparándolo para que el usuario pueda escribir un nuevo mensaje. */
    }


/* Este objeto contiene varios valores que se proporcionarán como valor al contexto de React. Estos valores incluyen: */
    const contextValue = { 
        prevPrompts,  /*El estado que almacena el historial de indicaciones previas enviadas al sistema de chat. */
        setPrevPrompts, /* La función para actualizar el estado prevPrompts */
        onSent, /* La función que se ejecuta cuando se envía un mensaje al sistema de chat. */
        setResentPrompt, /*La función para actualizar la última indicación enviada al sistema de chat. */
        resentPrompt, /*El estado que almacena la última indicación enviada al sistema de chat. */
        showResult, /* El estado que indica si se debe mostrar el resultado del chat en la interfaz. */
        loading, /* El estado que indica si la aplicación está en un estado de carga o procesamiento. */
        resultData,/* El estado que almacena los datos de la respuesta del chat. */
        input, /* El estado que almacena el texto ingresado por el usuario en el cuadro de entrada. */
        setInput, /* La función para actualizar el estado input. */
        newChat /*: La función que se ejecuta para restablecer algunos estados cuando se inicia un nuevo chat. */

    }


     {/*Este bloque de código devuelve el componente Context.Provider de React. Este componente se utiliza para proporcionar el contexto a otros componentes de la aplicación. */}
    return (
        <Context.Provider value={contextValue}> {/*El valor proporcionado al contexto es el objeto contextValue que contiene todos los valores y funciones que queremos compartir con otros componentes. */}
            {props.children} {/*Esto renderiza los componentes hijos (props) dentro del Context.Provider. De esta manera, cualquier componente que esté envuelto por ContextProvider tendrá acceso a los valores proporcionados en el contexto. */}
        </Context.Provider>
    )

}

export default ContextProvider;