from PIL import Image, ImageDraw
import random

# Dimensiones de la imagen
width = 500
height = 300

# Crear una nueva imagen
img = Image.new('RGB', (width, height), 'black')
draw = ImageDraw.Draw(img)

# Función para generar colores aleatorios
def random_color():
  r = random.randint(0, 255)
  g = random.randint(0, 255)
  b = random.randint(0, 255)
  return (r, g, b)

# Generar rectángulos aleatorios con colores aleatorios
for i in range(50):
  x1 = random.randint(0, width)
  y1 = random.randint(0, height)
  x2 = random.randint(x1, width)
  y2 = random.randint(y1, height)
  color = random_color()
  draw.rectangle([x1, y1, x2, y2], fill=color)

# Generar líneas aleatorias con colores aleatorios
for i in range(50):
  x1 = random.randint(0, width)
  y1 = random.randint(0, height)
  x2 = random.randint(0, width)
  y2 = random.randint(0, height)
  color = random_color()
  draw.line([x1, y1, x2, y2], fill=color, width=random.randint(1, 5))

# Guardar la imagen
img.save('imagen_aleatoria.png')
