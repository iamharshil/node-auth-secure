import UserModel from "../src/models/user.model";
import UserService from "../src/services/user.services";

jest.mock("../src/models/user.model");

describe("UserService", () => {
	it("should fetch users", async () => {
		const users = [{ username: "test" }];
		(UserModel.find as jest.Mock).mockReturnValue({
			exec: jest.fn().mockResolvedValue(users),
		});

		const result = await UserService.getUsers();
		expect(result).toEqual(users);
	});

	it("should fetch user by id", async () => {
		const user = { username: "test" };
		(UserModel.findById as jest.Mock).mockReturnValue({
			exec: jest.fn().mockResolvedValue(user),
		});

		const result = await UserService.getUserById("123");
		expect(result).toEqual(user);
	});

	it("should create a new user", async () => {
		const user = {
			username: "test",
			email: "test@example.com",
			password: "password",
		};
		(UserModel.create as jest.Mock).mockResolvedValue(user);

		const result = await UserService.createUser(user);
		expect(result).toEqual(user);
	});

	it("should update a user", async () => {
		const user = { username: "updated" };
		(UserModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
			exec: jest.fn().mockResolvedValue(user),
		});

		const result = await UserService.updateUser("123", user);
		expect(result).toEqual(user);
	});

	it("should delete a user", async () => {
		const user = { username: "deleted" };
		(UserModel.findByIdAndDelete as jest.Mock).mockReturnValue({
			exec: jest.fn().mockResolvedValue(user),
		});

		const result = await UserService.deleteUser("123");
		expect(result).toEqual(user);
	});
});
