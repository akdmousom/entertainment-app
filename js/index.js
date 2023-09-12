

const allCategoryFetch = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
  const data = await response.json();



  loadingOption(true)

  const categoryContainer = document.getElementById('category-container');

  data.data.forEach(element => {

    const categoryListButton = document.createElement('div');
    categoryListButton.innerHTML = `<button id="${element.category_id}" onClick=" clickButtonActive(this), itemFetchWithId('${element.category_id}', this)" class="btn w-[80px] defaultButton">${element.category}</button>`;
    categoryContainer.appendChild(categoryListButton);


  });

  loadingOption(false)
}

allCategoryFetch();


async function itemFetchWithId(params = '1000', click) {
  loadingOption(true)
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${params}`)
  const data = await response.json();

  if (data.status === false) {

   const errContainer = document.getElementById('err-container');
    errContainer.innerHTML = ''
    const err = document.createElement('div');
    err.innerHTML = `<img class="lg:w-[200px] flex ml-14 md:ml-20 lg:ml-20 justify-center items-center text-center" src="../img/Icon.png" alt="">
          <p class="lg:text-3xl text-xl md:text-2xl text-center lg:font-bold mt-10">Oops!! Sorry, There is  no <br> content here</p>`;
    errContainer.append(err);

    
  }if (data.status === true) {

    const errContainer = document.getElementById('err-container');
    errContainer.innerHTML = ''
    
  } 
  const cardContainer = document.getElementById('card-container');

  cardContainer.innerHTML = ''
  const clickItem = document.getElementsByTagName('button')[2];

  if (params === '1000') {

    clickItem.classList.add('activeButton')


  }


  data.data.forEach((element) => {
    sortBtn(element)
    

    const postDate = element?.others?.posted_date;
    const hour = Math.floor(postDate / 3600);
    const sec = postDate % 3600;
    const min = (sec / 60).toFixed(0);

    const div = document.createElement('div');
    div.innerHTML = `<div class="card h-[300px]  bg-base-100 shadow-xl">
        <figure><img class="rounded-[1rem]" src="${element?.thumbnail}" alt="Shoes" /></figure>
        <div class="card-body px-1">

          <div class="relative">
           <div class="flex gap-4"> <img class="rounded-full  w-[40px] h-[40px]" src=${element?.authors[0]?.profile_picture || 'No Profile Picture Available'}" alt="">
            <h2 class="card-title text-base font-bold">${element?.title}</h2></div>
            
            <div>${element?.others?.posted_date ? `<div class="absolute rounded-lg text-center bottom-[90px] right-[17px] bg-[#171717] text-[10px] font-normal text-white w-[100px]"><p>${hour} hrs ${min} min ago</p></div>` : ''}</div>
          
          </div>

          <div class="flex gap-4">
            <p class="text-sm flex-grow-0 font-normal text-[--text-color-user-name]">${element?.authors[0]?.profile_name || 'Author Name Not Found'}</p>
            <p>${element?.authors[0]?.verified ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clip-path="url(#clip0_11_34)">
              <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
              <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
            </g>
            <defs>
              <clipPath id="clip0_11_34">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>` : ""}</p>
            
          </div>
          <p class="text-sm flex-grow-0 font-normal text-[--text-color-user-name]">${element?.others?.views || 'No Views'}</p>
          
        </div>
      </div>`

    cardContainer.appendChild(div)
  })



  loadingOption(false)


}

itemFetchWithId();

function loadingOption(isLoading) {

  const loadContainer = document.getElementById('loading-container');

  if (isLoading) {

    loadContainer.classList.remove('hidden')

  } else {
    loadContainer.classList.add('hidden')
  }


}

function sortBtn(params) {
  const btn = document.getElementById('sortBtn')
  console.log(btn);
}

function clickButtonActive(click) {

  const clickItem = document.getElementsByTagName('button')[2];
  const clickItem2 = document.getElementsByTagName('button')[3];
  const clickItem3 = document.getElementsByTagName('button')[4];
  const clickItem4 = document.getElementsByTagName('button')[5];

  if (click === clickItem) {

    click.classList.add('activeButton');

    clickItem2.classList.remove('activeButton')
    clickItem3.classList.remove('activeButton')
    clickItem4.classList.remove('activeButton')

  } else if (click === clickItem2) {
    click.classList.add('activeButton');
    clickItem.classList.remove('activeButton')
    clickItem3.classList.remove('activeButton')
    clickItem4.classList.remove('activeButton')

  } else if (click === clickItem3) {

    click.classList.add('activeButton');
    clickItem.classList.remove('activeButton')
    clickItem4.classList.remove('activeButton')
    clickItem2.classList.remove('activeButton')

  }
  else {
    click.classList.add('activeButton');
    clickItem.classList.remove('activeButton')
    clickItem3.classList.remove('activeButton')
    clickItem2.classList.remove('activeButton')
  }

}

clickButtonActive();

