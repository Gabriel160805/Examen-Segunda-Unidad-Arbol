class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.derecha = null;
        this.izquierda = null;
    }
}

class Arbol {
    constructor() {
        this.ruta = null;
    }

    // Verifica si el árbol está vacío
    isEmpty() {
        return this.ruta === null;
    }

    // Agrega un nodo con un valor al árbol
    add(valor) {
        if (this.isEmpty()) {
            this.ruta = new Nodo(valor);
        } else {
            this._addNodo(this.ruta, valor);
        }
        this.updateTree(); // Redibuja el árbol después de agregar un nodo
    }

    _addNodo(nodo, valor) {
        if (valor < nodo.valor) {
            if (nodo.izquierda) {
                this._addNodo(nodo.izquierda, valor);
            } else {
                nodo.izquierda = new Nodo(valor);
            }
        } else {
            if (nodo.derecha) {
                this._addNodo(nodo.derecha, valor);
            } else {
                nodo.derecha = new Nodo(valor);
            }
        }
    }

    // Busca un nodo por su valor y muestra un mensaje
    buscar(valor) {
        let nodo = this._buscarNodo(this.ruta, valor);
        if (nodo) alert(`Nodo con valor ${valor} encontrado`);
        else alert(`Nodo con valor ${valor} no encontrado`);
    }

    _buscarNodo(nodo, valor) {
        if (!nodo) return null;
        if (valor === nodo.valor) return nodo;
        return valor < nodo.valor
            ? this._buscarNodo(nodo.izquierda, valor)
            : this._buscarNodo(nodo.derecha, valor);
    }

    // Elimina un nodo por su valor y redibuja el árbol
    eliminar(valor) {
        this.ruta = this._eliminarNodo(this.ruta, valor);
        this.updateTree();
    }

    _eliminarNodo(nodo, valor) {
        if (!nodo) return null;
        if (valor < nodo.valor) {
            nodo.izquierda = this._eliminarNodo(nodo.izquierda, valor);
        } else if (valor > nodo.valor) {
            nodo.derecha = this._eliminarNodo(nodo.derecha, valor);
        } else {
            if (!nodo.izquierda && !nodo.derecha) return null;
            if (!nodo.izquierda) return nodo.derecha;
            if (!nodo.derecha) return nodo.izquierda;

            let sucesor = this._encontrarMinimo(nodo.derecha);
            nodo.valor = sucesor.valor;
            nodo.derecha = this._eliminarNodo(nodo.derecha, sucesor.valor);
        }
        return nodo;
    }

    _encontrarMinimo(nodo) {
        while (nodo.izquierda) nodo = nodo.izquierda;
        return nodo;
    }

    // Actualiza la visualización del árbol en el contenedor HTML
    updateTree() {
        const container = document.getElementById("tree-container");
        container.innerHTML = ""; // Limpia el contenedor
        this._drawNode(this.ruta, container); // Dibuja el árbol
    }

    _drawNode(nodo, parent) {
        if (!nodo) return;
    
        // Crear el nodo principal
        const div = document.createElement("div");
        div.classList.add("node");
        div.innerText = nodo.valor;
    
        // Añadir el nodo al contenedor del padre
        parent.appendChild(div);
    
        // Crear contenedor de hijos solo si hay nodos hijos
        if (nodo.izquierda || nodo.derecha) {
            const childContainer = document.createElement("div");
            childContainer.classList.add("child-container");
    
            // Crear los contenedores izquierdo y derecho
            if (nodo.izquierda) {
                const leftContainer = document.createElement("div");
                leftContainer.classList.add("left-container");
                childContainer.appendChild(leftContainer);
                this._drawNode(nodo.izquierda, leftContainer);
            }
    
            if (nodo.derecha) {
                const rightContainer = document.createElement("div");
                rightContainer.classList.add("right-container");
                childContainer.appendChild(rightContainer);
                this._drawNode(nodo.derecha, rightContainer);
            }
    
            // Añadir el contenedor de hijos al nodo actual
            parent.appendChild(childContainer);
        }
    }
    
}

// Crear una instancia del árbol
const arbol = new Arbol();

// Funciones para conectar los botones de agregar, eliminar y buscar con el árbol
function agregarNodo() {
    const valor = parseInt(document.getElementById("valor").value);
    if (!isNaN(valor)) arbol.add(valor);
}

function eliminarNodo() {
    const valor = parseInt(document.getElementById("valor").value);
    if (!isNaN(valor)) arbol.eliminar(valor);
}

function buscarNodo() {
    const valor = parseInt(document.getElementById("valor").value);
    if (!isNaN(valor)) arbol.buscar(valor);
}
