from bs4 import BeautifulSoup

with open("C:/Users/Hayde/Documents/Projects/BWA_FashionGuide/ethical_fashion_guide/data/Raw_Data.xml") as file:
    data = file.readlines()
    html_content = ''.join(data)

soup = BeautifulSoup(html_content, 'html.parser')
items = soup.find_all('li')

data = []

for idx, item in enumerate(items, start=1):

    data.append({
        'id': str(idx),
        'name': item['data-name'],
        'company': item['data-company'].strip(),
        'overall-grade': int(item.find('span')['data-overall-grade']),
        'color_grade': item['data-grade-colorcode'],
        'statement': item['data-statement'],
        'grade_policies': item['data-grade-policies'],
        'grade_tracing': item['data-grade-tracing'],
        'grade_rights': item['data-grade-rights'],
        'grade_workers': item['data-grade-workers'],
        'grade_environment': item['data-grade-environment'],
        'grade_climate': item['data-grade-climate']
    })


with open("./data/Processed_Data.js", 'w+') as file:
    for i in data:
        file.write(str(i) + '\n')
