import { computed, map } from 'nanostores';

export const $cart = map<Record<number, CartItem>>({});

export function addItemToCart(item: ShopItem) {
	const cartItem = $cart.get()[item.id];
	const quantity = cartItem ? cartItem.quantity : 0;

	$cart.setKey(item.id, {
		item,
		quantity: quantity + 1,
	});
}

export function removeItemFromCart(itemId: number) {
	// @ts-ignore
	$cart.setKey(itemId, undefined);
}

// computed is used to calculate value of one thing based on someting else from store
export const subTotal = computed($cart, (entries) => {
	let subTotal = 0;

	// Similar to Array<CartItem>.forEach(callbackfn: (value: CartItem, index: number, array: CartItem[]) => void, thisArg?: any): void
	Object.values(entries).forEach((entry) => {
		if (!entry) {
			return;
		}
		subTotal += entry.quantity * entry.item.price;
	});
	return subTotal;
});
