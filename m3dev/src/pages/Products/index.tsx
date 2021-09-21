/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';

import { api } from '../../services/api';
import { images } from '../../data/images';

import { Sidebar, SizeFilter, Main, Section, Select, Top, Container, ProductCard, CheckButton } from "./styles";


interface Product {
    id: number;
    description: string;
    price: number;
    priceRangeId?: number;
    maxParcel: number;
    color: string;
    colorId?: number;
    size: string;
    sizeId?: number;
    imgId: number;
    createdAt: Date;
}

interface CommonData {
    id: number;
    name: string;
    isSelected: boolean;
}


export function Products() {
    const [priceRange, setPriceRange] = useState<CommonData[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [colors, setColors] = useState<CommonData[]>([]);
    const [sizes, setSizes] = useState<CommonData[]>([]);

    const [colorSelected, setColorSelected] = useState<number[]>([]);
    const [priceRangeSelected, setPriceRangeSelected] = useState<number[]>([]);
    const [sizeSelected, setSizeSelected] = useState<number[]>([]);


    function compareDates(a:Date, b:Date) {
        if(a.getTime() < b.getTime()) {
            return -1;
        }
        if(a.getTime() > b.getTime()) {
            return 1;
        }
        return 0;
    }

    function orderProductGrid(id: number) {
        let vector = products.map(item => {
            item.createdAt = new Date(item.createdAt);
            return item;
        });

        switch(id) {
            case 1:
                vector.sort((a,b) => compareDates(a.createdAt, b.createdAt));
                break;
            case 2:
                vector.sort((a,b) => a.price - b.price);
                break;
            case 3:
                vector.sort((a,b) => b.price - a.price);
                break;
        }

        setProducts(vector);
    }


    function checkColors(id: number) {
        const updatedColors = colors.map(color => {
          if(color.id === id) {
            if(color.isSelected === false){
                color.isSelected = true;
                setColorSelected([...colorSelected, id]);
            }
            else{
                color.isSelected = false;

                const otherColors = colorSelected.filter(item => item !== id);
                setColorSelected(otherColors);
            }
          }
          return color;
        })
    
        setColors(updatedColors);
    }

    function checkSizes(id: number) {
        const updatedSizes = sizes.map(size => {
          if(size.id === id) {
            if(size.isSelected === false){
                size.isSelected = true;
                setSizeSelected([...sizeSelected, id]);
            }
            else{
                size.isSelected = false;

                const otherSizes = sizeSelected.filter(item => item !== id);
                setSizeSelected(otherSizes);
            }
          }
          return size;
        })
    
        setSizes(updatedSizes);
    }

    function checkPriceRange(id: number) {
        const updatedPrices = priceRange.map(price => {
          if(price.id === id) {
            if(price.isSelected === false){
                price.isSelected = true;
                setPriceRangeSelected([...priceRangeSelected, id]);
            }
            else{
                price.isSelected = false;

                const otherPrices = priceRangeSelected.filter(item => item !== id);
                setPriceRangeSelected(otherPrices);
            }
          }
          return price;
        })
    
        setPriceRange(updatedPrices);
    }

    const filterProducts = (products: Product[], colorId: number[], sizeId: number[], priceRangeId: number[]) => {
        let filteredProducts: Product[] = [];

        if(!colorId[0] && !priceRangeId[0] && !sizeId[0]) {
            return products;
        }

        if(colorId[0]) {
            colorSelected.map(color => {
                products.map(item => {
                    if(color === item.colorId) {
                        const pro = filteredProducts.includes(item);
                        if(!pro) filteredProducts.push(item);
                    }
                });
            });
        }

        if(sizeId[0]) {
            sizeSelected.map(size => {
                products.map(item => {
                    if(size === item.sizeId) {
                        const pro = filteredProducts.includes(item);
                        if(!pro) filteredProducts.push(item);
                    }
                });
            });
        }

        if(priceRangeId[0]) {
            priceRangeSelected.map(price => {
                products.map(item => {
                    if(price === item.priceRangeId) {
                        const pro = filteredProducts.includes(item);
                        if(!pro) filteredProducts.push(item);
                    }
                });
            }); 
        }
         
        return filteredProducts;
    }

    const filteredProducts = filterProducts(products, colorSelected, sizeSelected, priceRangeSelected);

    useEffect(() => {
        filterProducts(products, colorSelected, sizeSelected, priceRangeSelected);
    }, [products]);

    
    useEffect(() => {
        api.get('products')
        .then(response => setProducts(response.data));
    
        api.get('filters/colors')
        .then(response => setColors(response.data[0]));

        api.get('filters/sizes')
        .then(response => setSizes(response.data[1]));

        api.get('filters/prices')
        .then(response => setPriceRange(response.data[2]));

        setColorSelected([]);
        setPriceRangeSelected([]);
    }, []);

    return (
        <Main>
            <Container>
                <Top>
                    <h1>Blusas</h1>

                    <div className="custom-select">
                        <Select>
                            <option value="0" hidden>Ordernar por: </option>
                            <option value="1" onClick={() => orderProductGrid(1)}>Mais recentes</option>
                            <option value="2" onClick={() => orderProductGrid(2)}>Menor preço</option>
                            <option value="3" onClick={() => orderProductGrid(3)}>Maior preço</option>
                        </Select>
                    </div>
                </Top>

                <Sidebar>
                    <div>
                        <h3>CORES</h3>
                        <ul>
                            {colors.map(color => {
                                return (
                                    <li key={color.id}>
                                    <input 
                                        type="checkbox" 
                                        name={color.name}
                                        readOnly
                                        checked={color.isSelected}
                                        onClick={() => {
                                            checkColors(color.id);
                                        }}
                                    />
                                    <label htmlFor={color.name}>{color.name}</label>
                                </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div>
                        <h3>TAMANHOS</h3>
                        <SizeFilter>
                            {sizes.map(size => {
                                return (
                                    <div id={size.id.toString()} key={size.id}>
                                        <CheckButton
                                            onClick={() => checkSizes(size.id)}
                                            isSelected={size.isSelected}
                                        >
                                            {size.name}
                                        </CheckButton>
                                    </div>
                                );
                            }) }
                        </SizeFilter>
                    </div>

                    <div>
                        <h3>FAIXA DE PREÇO</h3>
                        <ul>
                            {
                                priceRange.map(price => {
                                    return (
                                        <li key={price.id}>
                                            <input 
                                                type="checkbox" 
                                                name={price.name}
                                                readOnly
                                                checked={price.isSelected}
                                                onClick={() => {
                                                    checkPriceRange(price.id);
                                                }} 
                                            />
                                            <label htmlFor={price.name}>{price.name}</label>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </Sidebar>

                <Section>
                    {filteredProducts.map(product => {
                        return (
                            <ProductCard key={product.id} >
                                <img 
                                    src={images[product.imgId].name}
                                    alt={product.description} 
                                />
                                <h4>{product.description}</h4>
                                <span>{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(product.price)}</span>
                                <p>até {product.maxParcel}x de {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format((product.price/product.maxParcel))}</p>
                                <button>COMPRAR</button>
                            </ProductCard>
                        );
                    })}
                </Section>
            </Container>
        </Main>
    )
}