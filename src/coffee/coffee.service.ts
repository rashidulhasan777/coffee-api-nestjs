import { HttpException, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './interface/coffee.interface';

@Injectable()
export class CoffeeService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const result = this.coffees.find((coffee) => coffee.id === id);
    if (result) {
      return result;
    } else {
      return {
        message: `Coffee #${id} not found`,
        status: 404,
        error: true,
      };
      // throw new HttpException(`Coffee #${id} not found`, 404);
    }
  }

  createOne(createCoffeeDto: CreateCoffeeDto) {
    this.coffees.push({ id: this.coffees.length + 1, ...createCoffeeDto });
    return createCoffeeDto;
  }

  updateOne(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const index = this.coffees.findIndex(
      (updateCoffeeDto) => updateCoffeeDto.id === id,
    );
    if (index >= 0) {
      this.coffees[index] = { id: index + 1, ...updateCoffeeDto } as Coffee;
      return this.coffees[index];
    } else {
      throw new HttpException(`Coffee #${id} not found`, 404);
    }
  }

  deleteOne(id: number) {
    const index = this.coffees.findIndex((coffee) => coffee.id === id);
    if (index >= 0) {
      this.coffees.splice(index, 1);
    } else {
      throw new HttpException(`Coffee #${id} not found`, 404);
    }
  }
}
